import Link from "next/link";
import { AuthActions } from "@/components/auth-actions";
import { DiscoverProjectsMenu } from "@/components/discover-projects-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    buildDiscoveryHref,
    discoveryCategories,
    discoveryProjects,
    getDiscoveryStageLabel,
    getSecondaryCategoryLabel,
} from "@/lib/project-discovery";

import {
    Users,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Clock,
    Target,
    Zap,
    Shield,
    Search,
} from "lucide-react";

const featuredProjects = discoveryProjects.filter((project) =>
    ["weekly", "observer", "completion"].some((tag) => project.recommendations.includes(tag))
).slice(0, 3);

const latestProjects = [...discoveryProjects]
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
    .slice(0, 3);

const discoveryTypeCards = discoveryCategories.map((category) => ({
    ...category,
    count: discoveryProjects.filter((project) => project.primaryCategory === category.slug).length,
    highlights: category.secondaryCategories.slice(0, 3),
}));

const categoryEmojis: Record<string, string> = {
    content: "📚",
    product: "🧩",
    service: "🧭",
    community: "👥",
    "public-good": "🌱",
    event: "🎪",
};

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/10">
            {/* 顶部导航栏 - 居中分散布局 */}
            <header className="sticky top-0 z-50 border-b border-purple-100/50 dark:border-purple-900/30 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex h-20 items-center justify-between">
                        {/* 左侧品牌 */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* 双液态圆Logo */}
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full opacity-90 blur-[2px]"></div>
                                <div className="absolute inset-1 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 rounded-full"></div>
                                <div className="absolute inset-2 bg-white/40 dark:bg-white/20 backdrop-blur-sm rounded-full"></div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                                共创平台
                            </span>
                        </Link>
                        
                        {/* 中间导航 - 居中分散 */}
                        <nav className="hidden md:flex items-center gap-10 lg:gap-16 flex-1 justify-center">
                            <DiscoverProjectsMenu />
                            <Link href="/start" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105">
                                发起项目
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105">
                                平台介绍
                            </Link>
                            <Link href="/rules" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105">
                                规则说明
                            </Link>
                        </nav>

                        {/* 右侧操作区 */}
                        <div className="flex items-center gap-4">
                            <div className="relative hidden lg:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="搜索项目..."
                                    className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                                />
                            </div>
                            <AuthActions />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero 区域 - 液态毛玻璃效果 */}
            <section className="relative overflow-hidden py-24 lg:py-32">
                {/* 背景渐变装饰 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-300/30 via-purple-400/20 to-blue-400/30 rounded-full blur-3xl opacity-60 dark:opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-300/30 via-blue-400/20 to-pink-300/20 rounded-full blur-3xl opacity-60 dark:opacity-30"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/20 via-purple-300/20 to-blue-200/20 rounded-full blur-2xl opacity-40 dark:opacity-20"></div>
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* 标签 */}
                        <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-purple-200/50 dark:border-purple-800/50 rounded-full px-5 py-2.5 mb-8 shadow-lg shadow-purple-500/10">
                            <Zap className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                共创项目机制 · 逻辑闭环优先
                            </span>
                        </div>

                        {/* 主标题 */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 dark:from-slate-100 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                                拥抱你的价值
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                共创无限可能
                            </span>
                        </h1>

                        {/* 副标题 */}
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            基于申请—审核—执行—更新—复盘完整闭环的社群共创项目孵化器，让每一个创意都能被看见、被支持、被实现
                        </p>

                        {/* 按钮组 */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/start">
                                <Button 
                                    size="lg" 
                                    className="w-full sm:w-auto px-10 py-7 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-xl shadow-purple-500/25 transition-all hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 border-0"
                                >
                                    <Zap className="h-5 w-5 mr-2" />
                                    发起你的项目
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="w-full sm:w-auto px-10 py-7 text-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/10"
                                >
                                    <Users className="h-5 w-5 mr-2" />
                                    发现共创项目
                                </Button>
                            </Link>
                        </div>

                        {/* 特性标签 */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>免费提交申请</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Shield className="h-4 w-4 text-blue-500" />
                                <span>专业审核指导</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Target className="h-4 w-4 text-purple-500" />
                                <span>社群资源支持</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 平台数据统计 - 毛玻璃卡片 */}
            <section className="py-12 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-purple-100/50 dark:border-purple-900/30 shadow-2xl shadow-purple-500/10 p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    128
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">已发起项目</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    89
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">成功结项</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    2,456
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">支持人次</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    98%
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">满意度</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-end justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                                按项目类型发现
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                先从方向切入，再深入到细分类和推荐入口，像 Kickstarter 一样更快找到你愿意支持的项目。
                            </p>
                        </div>
                        <Link href="/projects">
                            <Button variant="ghost" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                进入发现项目页
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {discoveryTypeCards.map((category) => (
                            <Link key={category.slug} href={buildDiscoveryHref({ primary: category.slug })}>
                                <Card className="group h-full overflow-hidden rounded-3xl border border-purple-100/60 bg-white/70 shadow-xl shadow-purple-500/8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/12 dark:border-purple-900/30 dark:bg-slate-900/70">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-blue-500/15 text-3xl">
                                                    {categoryEmojis[category.slug]}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                        {category.label}
                                                    </CardTitle>
                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        当前 {category.count} 个项目
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-500" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                                            {category.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {category.highlights.map((secondary) => (
                                                <span
                                                    key={secondary.slug}
                                                    className="rounded-full border border-purple-200/70 bg-purple-50/70 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800/60 dark:bg-purple-950/30 dark:text-purple-300"
                                                >
                                                    {secondary.label}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 精选项目区 */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                                精选项目
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">逻辑完整、执行可靠的优质共创项目</p>
                        </div>
                        <Link href={buildDiscoveryHref({ view: "weekly" })}>
                            <Button variant="ghost" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                查看全部
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project) => (
                            <Card key={project.id} className="group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] rounded-2xl">
                                <div className="aspect-video bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30 flex items-center justify-center group-hover:from-purple-200/50 group-hover:via-pink-200/50 group-hover:to-blue-200/50 dark:group-hover:from-purple-800/40 dark:group-hover:via-pink-800/40 dark:group-hover:to-blue-800/40 transition-all duration-500">
                                    <div className="text-5xl">{project.emoji}</div>
                                </div>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <Badge variant="secondary" className="bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                                            {discoveryCategories.find((category) => category.slug === project.primaryCategory)?.label}
                                        </Badge>
                                        <Badge variant="outline" className="border-purple-200/50 dark:border-purple-800/50 text-slate-600 dark:text-slate-400">
                                            {getSecondaryCategoryLabel(project.primaryCategory, project.secondaryCategory)}
                                        </Badge>
                                    </div>
                                    <Badge className="w-fit bg-purple-100/80 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300">
                                        {project.badgeLabel}
                                    </Badge>
                                    <CardTitle className="line-clamp-2 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-3">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-500">项目进度</span>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">{project.completionRate}%</span>
                                        </div>
                                        <Progress value={project.completionRate} className="h-2" />
                                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4" />
                                                <span>{project.supporters} 人支持</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                <span>{project.daysLeft} 天剩余</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            当前阶段：{getDiscoveryStageLabel(project.stage)}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/projects/${project.id}`} className="w-full">
                                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105 border-0">
                                            查看详情
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最新项目区 */}
            <section className="py-16 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                                最新发布
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">刚刚上线，等待你的支持</p>
                        </div>
                        <Link href={buildDiscoveryHref({ sort: "newest" })}>
                            <Button variant="ghost" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                查看全部
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestProjects.map((project) => (
                            <Card key={project.id} className="group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-purple-100/50 dark:border-purple-900/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] rounded-2xl">
                                <div className="aspect-video bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:from-blue-200/50 group-hover:via-purple-200/50 group-hover:to-pink-200/50 dark:group-hover:from-blue-800/40 dark:group-hover:via-purple-800/40 dark:group-hover:to-pink-800/40 transition-all duration-500">
                                    <div className="text-5xl">{project.emoji}</div>
                                </div>
                                <CardHeader className="pb-3">
                                    <Badge variant="outline" className="w-fit mb-2 border-purple-200/50 dark:border-purple-800/50 text-slate-600 dark:text-slate-400">
                                        {discoveryCategories.find((category) => category.slug === project.primaryCategory)?.label}
                                    </Badge>
                                    <Badge className="w-fit bg-purple-100/80 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300">
                                        {project.badgeLabel}
                                    </Badge>
                                    <CardTitle className="line-clamp-2 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-500">支持进度</span>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">{project.completionRate}%</span>
                                        </div>
                                        <Progress value={project.completionRate} className="h-2" />
                                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4" />
                                                <span>{project.supporters} 人支持</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                <span>{project.daysLeft} 天剩余</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            当前阶段：{getDiscoveryStageLabel(project.stage)}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/projects/${project.id}`} className="w-full">
                                        <Button variant="outline" className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-purple-200/50 dark:border-purple-800/50 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all hover:scale-105">
                                            查看详情
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 平台机制介绍区 */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                            完整的项目共创机制
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            不是"谁会卖，谁上架"，而是"谁的项目逻辑更完整，谁获得支持"
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: CheckCircle2,
                                title: "申请审核",
                                desc: "项目申请表、逻辑闭环审核、专家评估"
                            },
                            {
                                icon: Target,
                                title: "执行更新",
                                desc: "定期阶段更新、透明化进展、及时反馈"
                            },
                            {
                                icon: TrendingUp,
                                title: "结项复盘",
                                desc: "最终结果、经验总结、持续改进"
                            },
                            {
                                icon: Shield,
                                title: "风险可控",
                                desc: "非投资声明、退款规则、资金监管"
                            }
                        ].map((item, index) => (
                            <div key={index} className="group">
                                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-purple-100/50 dark:border-purple-900/30 p-8 text-center hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <h3 className="font-bold mb-3 text-lg">{item.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 发起项目引导区 */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10"></div>
                <div className="absolute inset-0 backdrop-blur-3xl"></div>
                
                <div className="container mx-auto px-6 lg:px-12 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                            有好的项目想法？
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            提交你的项目申请，经过审核后获得社群支持，实现你的创意
                        </p>
                        <Link href="/start">
                            <Button 
                                size="lg" 
                                className="px-12 py-8 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-2xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 border-0"
                            >
                                <Zap className="h-6 w-6 mr-2" />
                                开始发起项目
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 平台声明区 */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-purple-100/50 dark:border-purple-900/30 p-6 md:p-8 shadow-lg shadow-purple-500/5">
                            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">平台声明</h3>
                            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>• 本平台为社群内部项目支持安排，不构成投资建议。审核通过不等于平台担保成功。</p>
                                <p>• 支持项目是基于回报型支持，不承诺收益，不涉及分红，不保证本金安全。</p>
                                <p>• 项目发起人对项目承诺的真实性、可行性承担全部责任。</p>
                                <p>• 请仔细阅读项目详情页的风险说明和退款规则，理性支持。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 页脚 */}
            <footer className="border-t border-purple-100/50 dark:border-purple-900/30 bg-gradient-to-br from-slate-50/50 via-transparent to-purple-50/50 dark:from-slate-950/50 dark:via-transparent dark:to-purple-950/30 py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">关于平台</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">平台介绍</Link></li>
                                <li><Link href="/rules" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">规则说明</Link></li>
                                <li><Link href="/faq" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">常见问题</Link></li>
                                <li><Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">联系我们</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">项目相关</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/projects" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">发现项目</Link></li>
                                <li><Link href="/start" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">发起项目</Link></li>
                                <li><Link href="/guide" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">项目指南</Link></li>
                                <li><Link href="/cases" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">成功案例</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">支持帮助</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/support" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">支持指南</Link></li>
                                <li><Link href="/refund" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">退款规则</Link></li>
                                <li><Link href="/risk" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">风险提示</Link></li>
                                <li><Link href="/community" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">社群规范</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">法律信息</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">服务条款</Link></li>
                                <li><Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">隐私政策</Link></li>
                                <li><Link href="/disclaimer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">免责声明</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-purple-100/50 dark:border-purple-900/30 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        <p>© 2025 共创平台 - 拥抱你的价值·共创无限可能</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
