import {ChunkModel} from './chunk.model';

export interface ServerChunksResponseModel {
    chunks: ChunkModel[];
    maxCount: number;
}
