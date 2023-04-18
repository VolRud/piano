import { DocumentNode, useQuery, useMutation } from "@apollo/react-hooks";
import { ISongs, ISoungMutation } from "./types/Song";

export function useSongQuery(gqlQuery: DocumentNode) {
    const { loading, error, data } = useQuery<ISongs>(gqlQuery);
    return { loading, error, data };
}

export function useSongsMutation(gqlQuery: DocumentNode) {
    const [addSong] = useMutation<ISoungMutation>(gqlQuery);
    return [addSong];
}
