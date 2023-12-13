import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Illustration from "../assets/illustration";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Illustration">
                <Illustration/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews