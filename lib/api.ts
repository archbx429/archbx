// lib/api.ts

interface WordPressPost {
    id: number;
    title?: { 
        rendered: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: {
            source_url?: string;
        }[];
    };
    acf?: { 
        description?: string;
        thumbnail?: { 
            url?: string;
            width?: number;
            height?: number;
        };
        authors?: string | null;
        year?: string | null;
        journal?: string | null;
        is_selected?: boolean;
        summary?: string | null;
        name?: string | null;
        role?: string | null;
        is_featured?: boolean;
        member_image?: {
            url?: string;
            width?: number;
            height?: number;
        };
        categories?: string | null;
        title?: string | null;
        thumbnail_describe?: string | null;
        abstract?: string | null;
        url?: string | null;
    };
}

export interface ResearchItem {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    width?: number;
    height?: number;
}

export async function getResearchData(): Promise<ResearchItem[]> {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiUrl) {
        console.error("WordPress API URL is not configured in .env.local");
        return [];
    }
    const fetchUrl = `${apiUrl}/wp/v2/research`;
    try {
        const res = await fetch(fetchUrl);
        if (!res.ok) {
            console.error(`Failed to fetch research data: ${res.status} ${res.statusText}`);
            return [];
        }
        const data:WordPressPost[] = await res.json();
        const researchItems: ResearchItem[] = data.map((item) => {
            const acfImageUrl = item.acf?.thumbnail?.url || "https://www.cribelab.org/wp-content/uploads/2025/02/placeholder-1.svg";
            return {
                id: item.id,
                title: item.title?.rendered || 'Untitled Research',
                description: item.acf?.description || null,
                image: acfImageUrl || null,
                width: item.acf?.thumbnail?.width || undefined,
                height: item.acf?.thumbnail?.height || undefined,
            };
        });
        return researchItems;
    } catch (error) {
        console.error("Error fetching or processing research data:", error);
        return [];
    }
}

export interface PublicationItem {
    id: number;
    categories: string;
    authors: string;
    thumbnail?: string | null;
    thumbnail_describe?: string | null;
    year: string;
    title: string;
    summary?: string | null;
    journal?: string | null;
    abstract?: string | null;
    url?: string | null;
    is_selected?: boolean;
}

export async function getPublicationsData(): Promise<PublicationItem[]> {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiUrl) {
        console.error("WordPress API URL is not configured in .env.local");
        return [];
    }

    const fetchUrl = `${apiUrl}/wp/v2/publication?_embed&orderby=date&order=desc&per_page=100`;
    try {
        const res = await fetch(fetchUrl);
        if (!res.ok) {
            console.error(`Failed to fetch publications: ${res.status} ${res.statusText}`)
            return [];
        }
        const data:WordPressPost[] = await res.json();

        const publications: PublicationItem[] = data.map((item) => {
            const featuredImageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
            const acfImageUrl = item.acf?.thumbnail?.url || null;
            return {
                id: item.id,
                categories: item.acf?.categories || 'Unknown Category',
                authors: item.acf?.authors || 'Unknown Authors',
                thumbnail: acfImageUrl || featuredImageUrl || null,
                thumbnail_describe: item.acf?.thumbnail_describe || null,
                year: item.acf?.year || 'N/A',
                title: item.acf?.title || 'Untitled Publication',
                summary: item.acf?.summary || null,
                journal: item.acf?.journal || null,
                abstract: item.acf?.abstract || null,
                url: item.acf?.url || null,
                is_selected: item.acf?.is_selected || false,
                
            };
        });

        return publications;
    } catch (error) {
        console.error("Error fetching or processing publications data:", error);
        return [];
    }
}

export interface TeamMemberItem {
    id: number;
    name: string;
    role?: string | null;
    image?: string | null;
    is_featured?: boolean;
    width?: number | null;
    height?: number | null;
}

export async function getTeamMembersData(): Promise<TeamMemberItem[]> {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
    if (!apiUrl) {
        console.error("WordPress API URL is not configured in .env.local");
        return [];
    }
    const fetchUrl = `${apiUrl}/wp/v2/member`
    try{
        const res = await fetch(fetchUrl);
        if (!res.ok) {
            console.error(`Failed to fetch team members: ${res.status} ${res.statusText}`);
            return [];
        }
        const data:WordPressPost[] = await res.json();
        const teamMembers: TeamMemberItem[] = data.map((item) => {
            const acfImageUrl = item.acf?.member_image?.url || "https://www.cribelab.org/wp-content/uploads/2025/02/placeholder-1.svg";
            const width = item.acf?.member_image?.width || null;
            const height = item.acf?.member_image?.height || null;
            return {
                id: item.id,
                name: item.acf?.name || 'Unknown Member',
                role: item.acf?.role || null,
                image: acfImageUrl || null,
                is_featured: item.acf?.is_featured || false,
                width: width,
                height: height,
            };
        });

        return teamMembers;
    } catch (error) {
        console.error("Error fetching or processing team members data:", error);
        return [];
    }
}

export interface MeanItem {
    id: string;
    label: string;
    href: string;
}

export async function getMeanData(): Promise<MeanItem[]> {
    const meanitems: MeanItem[] = [
        {
            id: 'mean-home',
            label: 'Home',
            href: 'home',
        },
        {
            id: 'mean-research',
            label: 'Research',
            href: 'research',
        },
        {
            id: 'mean-publications',
            label: 'Publications',
            href: 'publications',
        },
        {
            id: 'mean-team',
            label: 'Team',
            href: 'team',
        },
        {
            id: 'mean-news',
            label: 'News',
            href: 'news',
        },
        {
            id: 'mean-join',
            label: 'Join Us',
            href: 'join',
        },
    ]
    return (meanitems);
}
