let voxelStore = {
  items: [],
};

window.voxelStore = voxelStore;

const color = [ 
  '#000000', 
  '#ffffff',
  '#f44336',  // 3 red
  '#e91e63',  // 4 pink
  '#9c27b0',  // 5 purple
  '#673ab7',  // 6 deep-puple
  '#3f51b5',  // 7 indigo
  '#2196f3',  // 8 Blue
  '#03a9f4',  // 9 Light Blue
  '#00bcd4',  // 10 Cyan
  '#009688',  // 11 Teal
  '#4caf50',  // 12 Green
  '#8bc34a',  // 13 Light Green
  '#cddc39',  // 14 Lime
  '#ffeb3b',  // 15 Yellow
  '#ffc107',  // 16 Amber
  '#ff9800',  // 17 Orange
  '#ff5722',  // 18 Deep Orange
  '#795548',  // 19 Brown
  '#9e9e9e',  // 20 Grey
  '#607d8b',  // 21 Blue Grey
];

// const color = [
//   'colored_silver',
// 	'colored_blue',
// 	'colored_brown',
// 	'colored_cyan',
// 	'colored_gray',
// 	'colored_green',
// 	'colored_light_blue',
// 	'colored_lime',
// 	'colored_magenta',
// 	'colored_orange',
// 	'colored_pink',
// 	'colored_purple',
// 	'colored_red',
// 	'colored_silver',
// 	'colored_white',
// 	'colored_black',
// ]

export default voxelStore;
export { color };