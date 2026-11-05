import React from 'react';
import renderer from 'react-test-renderer';
import { it } from '@jest/globals';
import LoaderScreen from '../src/screens/LoaderScreen';

it('loader renders', () => {
  renderer.create(<LoaderScreen onFinish={() => {}} />);
});
