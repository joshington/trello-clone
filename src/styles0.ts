import styled from 'styled-components'

//import { DragPreviewContainer } from './styles';
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
    opacity:${props => (props.isHidden ? 0:1)}
` 