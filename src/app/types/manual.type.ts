export interface Manual
{
    Id: number;
    Titel: string;
    MatNr: number;
    DocumentTitel: string;
    ManualType: ManualType;
    Document: string;
    CreateDate: Date;
    CreateUser: string;
    UpdateDate: Date;
    UpdateUser: string;
    Reason: string;
}

export enum ManualType
{
    pack,
    repack
}