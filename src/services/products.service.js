import ProductsModel from "../models/products.models.js";

class ProductsService {
    //Obtenemos todos los productos
    async getProds(limitq,pageq,userq,category,stock,sort){
        try {
        const limit = limitq;
        const page = pageq || 1;
        let filter;
        const user = userq;

        if (limit || page && category != undefined && stock != undefined){
            const products = await ProductsModel.paginate({}, {limit, page})
            // products[1]._id
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return {_id, ...rest};
            })
            

            return {
                products,
                productsResult
            }
        }

        else if (category == undefined && stock != undefined){
            filter = stock
            const products = await ProductsModel.paginate({"stock": {$gte:filter}}, {limit: 10, page: 1})

            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            

            return {
                products,
                productsResult
            }
        }

        else if (category != undefined && stock == undefined){
            filter = category;
            const products = await ProductsModel.paginate({"category": filter}, {limit: 10, page: 1})
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            
            return {
                products,
                productsResult
            }
        }


        else if (limit || page && category == undefined && stock == undefined && sort != undefined){
            if (sort == 'asc'){
                const products = await ProductsModel.paginate({}, {sort: {"price": 'asc'}, limit:10, page: 1});
                const productsResult = products.docs.map(product => {
                    const {_id, ...rest} = product.toObject();
                    
                    return rest;
                })
                
                // res.render("products", {
                //     products: productsResult,
                //     hasPrevPage: products.hasPrevPage,
                //     hasNextPage: products.hasNextPage,
                //     prevPage: products.prevPage,
                //     nextPage: products.nextPage,
                //     currentPage: products.page,
                //     totalPages: products.totalPages,
                //     limit: products.limit,
                //     user: user
                // })

                return {
                    products,
                    productsResult
                }
                
            } else if(sort == 'desc'){
                const products = await ProductsModel.paginate({}, {sort: {"price": 'desc'}, limit:10, page: 1});
                console.log(products)
                const productsResult = products.docs.map(product => {
                    const {_id, ...rest} = product.toObject();
                    
                    return rest;
                })
                
                // res.render("products", {
                //     products: productsResult,
                //     hasPrevPage: products.hasPrevPage,
                //     hasNextPage: products.hasNextPage,
                //     prevPage: products.prevPage,
                //     nextPage: products.nextPage,
                //     currentPage: products.page,
                //     totalPages: products.totalPages,
                //     limit: products.limit,
                //     user: user
                // })

                return {
                    products,
                    productsResult
                }
            }
 
        }

        else if (!limit || page && category == undefined && stock == undefined && sort == undefined){
            const products = await ProductsModel.paginate({}, {limit: 10, page: 1})
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            
            // res.render("products", {
            //     products: productsResult,
            //     hasPrevPage: products.hasPrevPage,
            //     hasNextPage: products.hasNextPage,
            //     prevPage: products.prevPage,
            //     nextPage: products.nextPage,
            //     currentPage: products.page,
            //     totalPages: products.totalPages,
            //     limit: products.limit,
            //     id: productsResult._id,
            //     user: user
            // })

            return {
                products,
                productsResult
            }
        }
        } catch (error) {
            throw new Error("Error while getting products")
        }
    }

    //Obtenemos producto por su id
    async getProdById(pid){
        try {
            const products = await ProductsModel.findById(pid)
            if(!products){
                throw new Error("Error while getting products")
            }
            return products
            // res.json(products)
        } catch (error) {
            throw new Error("Error while getting products")
        }
    }

    //Agregamos producto
    async addProd(prod){
        try {
            
            const newProduct = new ProductsModel(prod);
            return await newProduct.save();
            // res.send({message: "New product added"})
        } catch (error) {
            throw new Error("Error while adding products")
        }
    }

    //Actualizamos producto
    async updateProd(pid,prod){
        try {
            const product = await ProductsModel.findByIdAndUpdate(pid, prod);
            if(!product){
                throw new Error("Error while updating products");
            }
        } catch (error) {
            throw new Error("Error while updating products")
        }
    }

    async deleteProd(pid){
        try {
            const product = await ProductsModel.findByIdAndDelete(pid);
            if(!product){
                throw new Error("Error while deleting products");
            }
        } catch (error) {
            throw new Error("Error while deleting products")
        }
    }
}

export default ProductsService