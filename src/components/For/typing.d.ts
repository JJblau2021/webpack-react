// import { ForProps } from ".";
type ForProps<T> = {
  items?: T[] | null;
  render: (item: T, index?: number) => React.ReactNode;
  fallback?: React.ReactNode;
};
declare function For<T>(props: ForProps<T>): React.ReactNode;
