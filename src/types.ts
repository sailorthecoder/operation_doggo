export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  city?: string;
  state?: string;
}

export interface Location {
  zip_code: string;
  city: string;
  state: string;
}

export interface SearchPageProps {
  handleLogout: () => void;
  dogData: Dog[];
}

export interface MatchPageProps {
  handleLogout: () => void;
}

export interface LoginPageProps {
  setAuthenticationStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FavoritesModalProps {
  favorites: Dog[];
  getMatch: () => void;
  onRemove: (dogId: string) => void;
  onClose: () => void;
}

export interface DogCardProps {
  dog: Dog;
  onButtonClick?: () => void;
  buttonLabel?: string;
  buttonColor?: string;
  customStyle?: React.CSSProperties;
}

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  setCurrentPage: (page: number) => void;
}

export interface FilterProps {
  ageMin: number | null;
  setAgeMin: React.Dispatch<React.SetStateAction<number | null>>;
  ageMax: number | null;
  setAgeMax: React.Dispatch<React.SetStateAction<number | null>>;
  dogData: Dog[];
  isAscending: boolean;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: "breed" | "age";
  setSortBy: React.Dispatch<React.SetStateAction<"breed" | "age">>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filterDogs: (
    breed: string | null,
    minAge: number | null,
    maxAge: number | null,
    isAsc: boolean
  ) => Dog[];
}

export interface SortModalProps {
  filterProps: FilterProps;
  onClose: () => void;
}

export interface UsePaginationProps {
  initialData: Dog[];
  filterFunction: (data: Dog[]) => Dog[];
  pageSize?: number;
}
