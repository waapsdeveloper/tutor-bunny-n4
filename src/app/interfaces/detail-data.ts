export interface bannerData {
    liked_by_me: boolean;
    sliderImages: any[];
    actions: any[];
}

export interface infoData {
    title: string, 
    currency_symbol: string,
    price: string,
    rating: number,
    total_rating: number,
    per_unit: string
}

export interface infoColumnSingleItem {
    icon: string,
    text: string
}

export interface teacherCardInfo {
    email: string,
    teacher_id: number,
    image: string,
    name: string,
    flag: string,
    country: string,
    icon: string,
    text: string
}

