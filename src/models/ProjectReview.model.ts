type Owner = {
    name: string;
    email: string;
};

type Media = {
    images: number;
    videos: number;
};

export type ProjectReview = {
    id: number;
    name: string;
    location: string;
    owner: Owner;
    thumbnail_url: string;
    media: Media;
    visibility: string;
    status: string;
    updated_at: string;
    folder_name: string;
};

export default ProjectReview;
