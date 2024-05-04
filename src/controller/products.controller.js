import ProductsService from "../services/products.service.js";
const productsService = new ProductsService();

class ProductsController {
    async getProds(req, res){
        try {
            const user = req.session.user;
            console.log(user)
            let result = await productsService.getProds(req.query.limit,req.query.page,req.session.user,req.query.category,req.query.stock,req.query.sort)
            res.render("products", {
            products: result.productsResult,
            hasPrevPage: result.products.hasPrevPage,
            hasNextPage: result.products.hasNextPage,
            prevPage: result.products.prevPage,
            nextPage: result.products.nextPage,
            currentPage: result.products.page,
            totalPages: result.products.totalPages,
            limit: result.products.limit,
            prevLink: result.products.prevLink,
            nextLink: result.products.nextLink,
            id: result.productsResult._id,
            user: user
            })
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    //Obtenemos producto por ID
    async getProdById(req, res){
        try {
            let product = await productsService.getProdById(req.params.pid)
            res.json(product)
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    //Agregamos producto
    async addProd(req,res){
        try {
            await productsService.addProd(req.body);
            res.send({message: "New product added"});
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    //Actualizamos producto
    async updateProd(req,res){
        try {
            await productsService.updateProd(req.params.pid, req.body);
            return res.status(200).send({message: "Product updated"});
        } catch (error) {
            res.status(500).json({message:"Server error"});
        }
    }

    //Eliminamos producto
    async deleteProd(req,res){
        try {
            await productsService.deleteProd(req.params.pid);
            return res.status(200).send({message: "Product deleted"});
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }


}

export default ProductsController