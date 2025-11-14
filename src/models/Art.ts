import { prop, getModelForClass } from "@typegoose/typegoose";

export class ArtPiece {
  id!: string;
  era!: string;
  title!: string;
  artist!: string;
  year?: string;
  description?: string;
  image?: string;
  slug?: string;
}

export const ArtPieceModel = getModelForClass(ArtPiece, {
  schemaOptions: { collection: "artwork" },
});
