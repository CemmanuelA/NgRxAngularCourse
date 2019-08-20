import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.action';


    export interface ProductState {
        showProductCode: boolean;
        currentProductId: number | null;
        products: Product[];
        error: string;
    }

    const initialState: ProductState = {
        showProductCode: true,
        currentProductId: null,
        products: [],
        error: ''
    };

export const reducer = (state = initialState , action: ProductActions): ProductState => {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return { ...state,
                showProductCode: action.payload,
                   };

        case ProductActionTypes.SetCurrentProduct:
            return { ...state,
                    currentProductId: action.payload.id,
                   };
                   case ProductActionTypes.ClearCurrentProduct:
            return { ...state,
                currentProductId: null
            };
            case ProductActionTypes.InitializeCurrentProduct:
            return { ...state,
                currentProductId: 0
                };
                case ProductActionTypes.LoadSuccess:
            return {...state,
                    products: action.payload,
                    error: ''};

                    case ProductActionTypes.LoadFail:
                        return {...state,
                products: [],
                error: action.payload};
        case ProductActionTypes.UpdateProductSuccess:
            const updateProducts = state.products.map( item =>
                action.payload.id === item.id ? action.payload : item);
                return {...state, products: updateProducts, currentProductId: action.payload.id, error: '' };

        case ProductActionTypes.UpdateProductFail:
            return { ...state, error: action.payload };

        case ProductActionTypes.CreateProductSuccess:
            const newProducts = state.products;
            newProducts.concat(action.payload);
            return {...state, products: newProducts, currentProductId: action.payload.id, error: '' };

        case ProductActionTypes.CreateProductFail:
            return { ...state, error: action.payload };

        case ProductActionTypes.DeleteProductSuccess:
            const filterProducts = state.products.filter(product => product.id !== action.payload);
            return {...state, products: filterProducts, currentProductId: null, error: '' };

            case ProductActionTypes.DeleteProductFail:
                return { ...state, error: action.payload };

        default:
            return state;
    }
};

