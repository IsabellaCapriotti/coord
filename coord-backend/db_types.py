class Product: 

    imageSource = ""
    productName = ""

    currX = 0
    currY = 0 
    currHeight = 0
    currWidth = 0 

    isHidden = False

    def __init__(self, imageSource, productName, currX, currY, currHeight, currWidth, isHidden):
        self.imageSource = imageSource
        self.productName = productName
        self.currX = currX
        self.currY = currY
        self.currHeight = currHeight
        self.currWidth = currWidth
        self.isHidden = isHidden

class Coord: 

    products = []
    xDim = 0
    yDim = 0 

    user_id = 0 

    def __init__(self, products, xDim, yDim, user_id)
        self.products = products
        self.xDim = xDim
        self.yDim = yDim
        self.user_id = user_id

