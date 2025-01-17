import { prodActive } from "../enums/prodActive.enum";

export interface IProduct {
    "idProducto":number,
    "prodActive": prodActive,
    "prodCategory":string,
    "prodIdHTML":string,
    "prodImg":string,
    "prodName":string,
    "prodPrecio":number
}
