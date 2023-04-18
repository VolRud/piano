import gql from "graphql-tag";

export const GET_SONGS = gql`
    query Songs {
        songs {
            _id
            title
            keyStrokes
        }
    }
`;

// export const ADD_SONG = gql`
//   mutation addSong( $title: String!, $keyStrokes: String!) {
//     addSong(songInput: { title: $title, keyStrokes: $keyStrokes }) {
//         title
//         keyStrokes
//     }
//   }
// `;

export const ADD_SONG = gql`
    mutation addSong($title: String!, $keyStrokes: [Int]!) {
        addSong(title: $title, keyStrokes: $keyStrokes) {
            title
            keyStrokes
        }
    }
`;
