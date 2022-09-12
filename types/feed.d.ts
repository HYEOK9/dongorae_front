export type IFeedDetail = {
    addressCategory: string;
    addressCity: string;
    addressCounty: string;
    addressLatitude: number;
    addressLongitude: number;
    addressPlaceName: string;
    hashTags: string;
    photos: any[];
    senseAuditory: number;
    senseOral: number;
    senseProprioceptive: number;
    senseTactile: number;
    senseVestibular: number;
    senseVisual: number;
    text: string;
    title: string;
    writerId: number;
};

export interface IFeedThumbnail {
    feedId:    number;
    writerId:  number;
    title:     string;
    text:      string;
    writer:    string;
    mainPhoto: null;
    sensedata: Sensedata;
}

export interface ISensedata {
    id:             number;
    auditory:       number;
    visual:         number;
    vestibular:     number;
    tactile:        number;
    proprioceptive: number;
    oral:           number;
}
