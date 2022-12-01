export const axes = ['x', 'y', 'z', 'r'] as const;
export type Axis = typeof axes[number];

export default axes;
