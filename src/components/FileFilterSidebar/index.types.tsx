export interface IFileFilterSideBarProps {
  userSpace: IUserSpace;
  onFilterSelect: (HTTPRoute: string) => void;
}

export interface IUserSpace {
  spaceAvailable: number;
  spaceUsed: number;
}
