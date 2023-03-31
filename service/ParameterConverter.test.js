import loglevel from 'loglevel';
import { facetSelectionMapToFq } from './ParameterConverter'

loglevel.setLevel('debug');
jest.mock('@/util/logging', () => loglevel);

test('empty selection', () => {
    const selection = {};
    const expected = [];
    const result = facetSelectionMapToFq(selection);
    expect(result).toEqual(expected);
});

test('simple selection', () => {
    const selection = { 'fieldA': ['valueA'], 'fieldB': 'valueB' };
    const expected = ['fieldA:valueA', 'fieldB:valueB'];
    const result = facetSelectionMapToFq(selection);
    expect(result).toEqual(expected);
});


test('multiple selection', () => {
    const selection = { 'fieldA': ['valueA1', 'valueA2'], 'fieldB': 'valueB' };
    const expected = ['fieldA:valueA1', 'fieldA:valueA2', 'fieldB:valueB'];
    const result = facetSelectionMapToFq(selection);
    expect(result).toEqual(expected);
});
