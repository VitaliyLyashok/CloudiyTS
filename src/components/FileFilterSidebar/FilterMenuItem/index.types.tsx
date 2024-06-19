export interface IFilterMenuItemProps {
  id: string;
  HTTPRoute: string;
  label: string;
  icon: JSX.Element;
  activeRoute: string,
  onFilterSelect: (HTTPRoute: string) => void;
}
