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

export interface DogSearchPageProps {
  handleLogout: () => void;
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

export type AxiosError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
