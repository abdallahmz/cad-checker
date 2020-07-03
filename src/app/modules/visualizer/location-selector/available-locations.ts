import { ILocation } from '../../location/location-state.service';

export const availableLocations: ILocation[] = [
  {
    name: 'Le Thillay',
    commune: '95',
    departement: '95612',
    bounds: [
      [49.013129, 2.441003],
      [48.992718, 2.492029]
    ]
  },
  {
    name: 'Paris, 1er arrondissement',
    commune: '75',
    departement: '75101',
    bounds: [
      [48.871449, 2.320150],
      [48.853154, 2.351049]
    ]
  },
  {
    name: 'Saint-Cloud',
    commune: '92',
    departement: '92064',
    bounds: [
      [48.860963, 2.181543],
      [48.826456, 2.223695]
    ]
  }
];
