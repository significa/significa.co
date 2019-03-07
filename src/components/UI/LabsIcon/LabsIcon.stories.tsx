import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, boolean } from '@storybook/addon-knobs'

import LabsIcon from './'
import { LabsSourceType } from './types'

const sources: LabsSourceType[] = ['medium', 'github', 'dribbble']

storiesOf("UI/Labs' Icon", module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Medium', () => <LabsIcon source="medium" />)
  .add('Medium (color)', () => <LabsIcon source="medium" color />)
  .add('Github', () => <LabsIcon source="github" />)
  .add('Github (color)', () => <LabsIcon source="github" color />)
  .add('Dribbble', () => <LabsIcon source="dribbble" />)
  .add('Dribbble (color)', () => <LabsIcon source="dribbble" color />)
  .add('All', () => (
    <LabsIcon
      source={select('Source', sources, sources[0]) as LabsSourceType}
      color={boolean('Color', false)}
    />
  ))
