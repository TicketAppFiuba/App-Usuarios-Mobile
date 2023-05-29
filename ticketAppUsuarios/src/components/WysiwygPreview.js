import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import draftToHtml from 'draftjs-to-html';



export default function WysiwygPreview({content}) {
    if (!content) return null;
    console.log(content)
    const rawContentState = JSON.parse(content)
    const markup = draftToHtml(
        rawContentState
        );
    const source = {
        html: markup
    };
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
        contentWidth={width}
        source={source}
        tagsStyles={{
            b: {
                fontSize: '1.5em',
                fontWeight: 'bold',
            },
            p: {
                fontSize: 18,
            },
            li: {
                fontSize: 18,
            },
            ul: {
                fontSize: 18,
            },
            ol: {
                fontSize: 18,
            },
            h1: {
                fontSize: 18,
            },
            h2: {
                fontSize: 18,
            },
            h3: {
                fontSize: 18,
            },

        }}
        />
  );
}
