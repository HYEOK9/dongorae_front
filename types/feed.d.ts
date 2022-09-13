export interface IFeedDetail {
    feedId:     number;
    writerId:   number;
    writerName: null;
    title:      string;
    text:       string;
    created_at: number;
    updated_at: number;
    photoUrls:  any[];
    sensedata:  Sensedata;
    location:   Location;
}

export interface ILocation {
    id:         number;
    longitude:  float;
    latitude:   float;
    placeName:  string;
    city:       string;
    county:     string;
    category:   string;
    updated_at: number;
    created_at: number;
}


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
