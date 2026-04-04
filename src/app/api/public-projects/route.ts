import { NextResponse } from 'next/server';

import { mapSubmissionToDiscoveryProject } from '@/lib/project-submissions';
import { createSupabaseServiceClient, isSupabaseServerConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ projects: [] });
  }

  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('status', 'approved')
      .order('reviewed_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      projects: (data || []).map(mapSubmissionToDiscoveryProject),
    });
  } catch (error) {
    console.error('读取公开项目失败:', error);
    return NextResponse.json({ message: '读取公开项目失败。' }, { status: 500 });
  }
}
