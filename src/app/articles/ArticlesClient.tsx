"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Footer from "@/src/components/layout/Footer";
import { useLenis } from "lenis/react"; // 1. Import useLenis

interface Article {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string;
    _createdAt: string;
    body: any;
}

interface ArticlesClientProps {
    initialArticles: Article[];
}

const portableTextComponents = {
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold text-[#0a1c43] mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold text-[#0a1c43] mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-bold text-[#0a1c43] mt-6 mb-3">{children}</h3>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-[#ed1c24] pl-4 italic my-6 text-gray-600 bg-slate-50 py-2 pr-2">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 marker:text-[#ed1c24]">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2 marker:text-[#0a1c43] font-medium">
                {children}
            </ol>
        ),
    },
};

const ARTICLES_PER_PAGE = 6;

export default function ArticlesClient({ initialArticles }: ArticlesClientProps) {
    const lenis = useLenis(); // 2. Initialize Lenis

    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(initialArticles.length === ARTICLES_PER_PAGE);

    const fetchMoreArticles = async (start: number) => {
        const end = start + ARTICLES_PER_PAGE;
        const query = `*[_type == "article"] | order(_createdAt desc)[${start}...${end}] {
      _id, title, "slug": slug.current, excerpt, "imageUrl": mainImage.asset->url, _createdAt, body
    }`;

        try {
            const data = await client.fetch(query);

            if (data.length < ARTICLES_PER_PAGE) {
                setHasMore(false);
            }
            setArticles((prev) => [...prev, ...data]);
        } catch (error) {
            console.error("Failed to fetch more articles:", error);
        }
    };

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        await fetchMoreArticles(articles.length);
        setIsLoadingMore(false);
    };

    // 3. UPDATED: Stop Lenis while the modal is open
    useEffect(() => {
        if (selectedArticle) {
            document.body.style.overflow = "hidden";
            lenis?.stop(); // Pause background scrolling
        } else {
            document.body.style.overflow = "unset";
            lenis?.start(); // Resume background scrolling
        }
        return () => {
            document.body.style.overflow = "unset";
            lenis?.start();
        };
    }, [selectedArticle, lenis]);

    const closeArticleModal = () => setSelectedArticle(null);

    return (
        <>
            <main className="bg-slate-50 min-h-screen pb-10">
                <section className="bg-[#0a1c43] py-10 mt-10 px-6 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Latest from Lokayan
                    </h1>
                    <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto">
                        Stay updated with daily current affairs, strategy guides, and
                        academy announcements to boost your preparation.
                    </p>
                </section>

                <section className="max-w-7xl mx-auto px-6 mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <h3 className="text-2xl font-bold text-[#0a1c43] mb-2">
                                    No articles found
                                </h3>
                                <p className="text-gray-500">
                                    Check back later for new updates and study materials.
                                </p>
                            </div>
                        ) : (
                            articles.map((article) => (
                                <button
                                    key={article._id}
                                    onClick={() => setSelectedArticle(article)}
                                    className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left w-full focus:outline-none"
                                >
                                    <div className="relative w-full h-52 bg-slate-200 overflow-hidden shrink-0">
                                        <Image
                                            src={article.imageUrl || "/assets/placeholder.png"}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow w-full">
                                        <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                                            {new Date(article._createdAt).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                },
                                            )}
                                        </p>
                                        <h3 className="text-xl font-bold text-[#0a1c43] mb-3 line-clamp-2 leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 font-light text-sm line-clamp-3 mb-6 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <span className="text-sm font-bold text-[#ed1c24] group-hover:text-[#0a1c43] transition-colors mt-auto flex items-center gap-2">
                                            Read Full Article &rarr;
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    {hasMore && articles.length > 0 && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-[#0a1c43] text-[#0a1c43] font-bold rounded-full hover:bg-[#0a1c43] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoadingMore ? "Loading..." : "Load More Articles"}
                                {!isLoadingMore && (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}
                </section>

                {selectedArticle && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <div
                            className="absolute inset-0 bg-[#0a1c43]/80 backdrop-blur-md transition-opacity"
                            onClick={closeArticleModal}
                        />
                        {/* 4. UPDATED: Added data-lenis-prevent to the scrollable container */}
                        <div
                            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
                            data-lenis-prevent
                        >
                            <button
                                onClick={closeArticleModal}
                                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-800 hover:text-[#ed1c24] p-2 rounded-full transition-colors shadow-sm"
                                aria-label="Close article"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="relative w-full h-64 sm:h-80 md:h-[400px]">
                                <Image
                                    src={selectedArticle.imageUrl}
                                    alt={selectedArticle.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c43]/90 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-red-400 font-bold text-sm uppercase mb-2">
                                        {new Date(selectedArticle._createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            },
                                        )}
                                    </p>
                                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                                        {selectedArticle.title}
                                    </h2>
                                </div>
                            </div>
                            <div className="p-8 sm:px-12 sm:py-10">
                                <PortableText
                                    value={selectedArticle.body}
                                    components={portableTextComponents}
                                />
                                <div className="mt-12 pt-6 border-t border-gray-200 flex justify-center">
                                    <button
                                        onClick={closeArticleModal}
                                        className="px-8 py-3 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Close Article
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}