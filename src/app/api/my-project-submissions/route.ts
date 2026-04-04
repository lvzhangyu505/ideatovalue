import { NextResponse } from 'next/server';

import { createSupabaseServiceClient, getUserFromAccessToken, isSupabaseServerConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';

function getAuthorizationToken(request: Request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return '';
  }

  return header.slice('Bearer '.length).trim();
}

export async function GET(request: Request) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ submissions: [] });
  }

  try {
    const accessToken = getAuthorizationToken(request);
    if (!accessToken) {
      return NextResponse.json({ message: '请先登录。' }, { status: 401 });
    }

    const user = await getUserFromAccessToken(accessToken);
    if (!user?.email) {
      return NextResponse.json({ message: '当前登录状态无效，请重新登录。' }, { status: 401 });
    }

    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    console.error('读取我的项目申请失败:', error);
    return NextResponse.json({ message: '读取我的项目申请失败。' }, { status: 500 });
  }
}
