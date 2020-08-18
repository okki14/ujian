var arrProduct=[
    {id:1579581080923,category:'Fast Food',name:'Noodle',price:3500,stock:9},
    {id:1579581081130,category:'Electronic',name:'Headphone',price:4500,stock:8},
    {id:1579581081342,category:'Cloth',name:'Hoodie',price:3000,stock:7},
    {id:1579581081577,category:'Fruit',name:'Apple',price:1000,stock:8},

];

var arrCategory =['All','Fast Food','Electronic','Cloth','Fruit'];
var indexdelete=-1
var indexedit  =-1
var indexeditCart=-1
cart=[

]

const tampilkanawal=()=>{
    var outputprod=arrProduct.map((val,index)=>{
        if(index==indexdelete){
            return `<tr>
                        <td>${val.id}</td>                    
                        <td>${val.category}</td>
                        <td>${val.name}</td>
                        <td>${val.price}</td>
                        <td>${val.stock}</td>
                        <td><input type='button' value='Add' id='tidak' onclick='funbuy(${val.id})'></button>
                        <td><input type='button' value='Yes' onclick='savedelete(${index})'></button>
                            <input type='button' value='Cancel' onclick='canceldelete(${index})'></button></td>
                
                    </tr>`
        }
        if(index==indexedit){
            const outputcategory=arrCategory.map((val1)=>{
                if(val1==val.category){
                    return`
                        <option value='${val1}' selected>${val1}</option>`
                }
                return`
                        <option value='${val1}'>${val1}</option>`
                
            }).join('')
            return `<tr>
                        <td>${val.id}</td>                    
                        <td><select id='editkategori${index}'>${outputcategory}</select></td>
                        <td><input type='text' value='${val.name}' id='editname${index}'</td>
                        <td><input type='number' value='${val.price}' id='editprice${index}'</td>
                        <td><input type='number' value='${val.stock}' id='editstock${index}'</td>
                        <td><input type='button' value='Add' onclick='funbuy(${val.id})'></button>
                        <td><input type='button' value='Save' onclick='saveEdit(${index})'></button>
                            <input type='button' value='Cancel' onclick='cancelEdit(${index})'></button></td>
                
                    </tr>`
        }
        return `<tr>
                        <td>${val.id}</td>                    
                        <td>${val.category}</td>
                        <td>${val.name}</td>
                        <td>${val.price}</td>
                        <td>${val.stock}</td>
                        <td><input type='button' value='Add' onclick='funbuy(${val.id})'></button>
                        <td><input type='button' value='Delete' onclick='fundelete(${index})'></button>
                            <input type='button' value='Edit' onclick='fundeedit(${index})'></button></td>

                    </tr>`
    }).join('')
    const outputcategory=arrCategory.map((val)=>{
        return`
            <option value='${val}'>${val}</option>`
        
    }).join('')
    document.getElementById('categoryFilter').innerHTML=outputcategory
    document.getElementById('render').innerHTML=outputprod
    document.getElementById('categoryInput').innerHTML=outputcategory


}
    const tampilkanCart=()=>{
        if(cart.length){
            var outputcart=cart.map((val,index)=>{
                if(index==indexedit){
                    return `<tr>
                                <td>${val.id}</td>   
                                <td>${val.category}</td>               
                                <td>${val.name}</td>
                                <td>${val.price}</td>
                                <td><input type='number' value='${val.qty}' id='editqty${index}'</td>                                
                                <td><input type='button' value='Save' onclick='saveEditcart(${val.id})'></button></td>
                                <td><input type='button' value='Cancel' onclick='cancelEditcart(${val.id})'></button></td>
                        
                            </tr>`
                }
                return `<tr>
                            <td>${val.id}</td>                    
                            <td>${val.category}</td>
                            <td>${val.name}</td>
                            <td>${val.price}</td>                        
                            <td>${val.qty}</td>                        
                            <td><input type='button' value='Delete' onclick='deleteCart(${val.id})'></button>
                            <td><input type='button' value='Edit' onclick='editCart(${index})'></button>
                            
    
                        </tr>`
            }).join('')
            return outputcart
        }else{
            return ''
        }
    }

    let deleteCart=(id)=>{
        var indexcart=cart.findIndex((val)=>val.id==id)
        var indexprodd=arrProduct.findIndex((val)=>val.id==id)        
        arrProduct[indexprodd].stock+=cart[indexcart].qty
        cart.splice(indexcart,1)
        
        tampilkanawal()
        document.getElementById('cart').innerHTML=tampilkanCart()
        

    }
    let editCart=(id)=>{        
        indexedit=id
        document.getElementById('cart').innerHTML=tampilkanCart()
        }

    let saveEditcart=(id)=>{        
        var indexcart=cart.findIndex((val)=>val.id==id)
        var indexprodd=arrProduct.findIndex((val)=>val.id==id)
        
        var qty=parseInt( document.getElementById('editqty'+indexedit).value)
        //arrProduct[indexprodd].stock+=cart[indexcart].qty
        arrProduct[indexprodd].stock+= Math.abs(qty-cart[indexedit].qty)
        cart.splice(indexcart,1,{...cart[indexedit],qty})
        indexedit=-1
        document.getElementById('cart').innerHTML=tampilkanCart()
        tampilkanawal()
    }
    let cancelEditcart=()=>{
        indexedit=-1
        document.getElementById('cart').innerHTML=tampilkanCart()

    }

    

    let funbuy=(id)=>{
        var indexpilihan=arrProduct.findIndex((val)=>val.id==id)
        var indexcart=cart.findIndex((val)=>val.id==id)
        if(indexcart==-1){
            cart.push({...arrProduct[indexpilihan],qty:1})
            arrProduct[indexpilihan].stock--
        }else if(arrProduct[indexpilihan].stock<=0 && cart[indexcart].qty>arrProduct[indexpilihan].stock){
            // document.getElementById('tidak').disabled=true
            // arrProduct[indexpilihan].stock=disabled
            alert('Stock Habis Bro')
        }else{
            cart[indexcart].qty++
            arrProduct[indexpilihan].stock--   

        }
        tampilkanawal()
        document.getElementById('cart').innerHTML=tampilkanCart()
    }
    const totalharga=()=>{
        var output=0
        cart.forEach((val)=>{
            output+=val.price*val.qty
        })
        var ppn=output*0.01
        var total=output+ppn
        return total
    }

    let payment=()=>{
        var listpayment=cart.map((val)=>{
            return `<p>${val.id} | ${val.category} | ${val.name} | ${val.price} |</p>`
        })
        var subtotal=0
        cart.forEach((val,index)=>{
            subtotal+=val.price*val.qty
        });
        var ppn=subtotal*0.01
        var total=subtotal+ppn
        document.getElementById('payment').innerHTML=listpayment.join('') + `<h3>Subtotal ${subtotal}</h3>`+`<h3>Ppn ${ppn}</h3>`+`<h3>Total ${total}</h3>`
        
         document.getElementById('input').innerHTML=`<input type="number" id="membayar"/>`
                                                     
    }
    let bayar=()=>{
        var input=document.getElementById('membayar').value
        if(input<totalharga()){
            alert('kurang woy '+(totalharga()-input))
        
            
        }else if(input==totalharga()){
            alert('terima kasih')
           
        }else{
            alert('terima kasih kembaliannya '+(input-totalharga()))
            
        }
        
        
    }

    let fundelete=(index)=>{
        indexdelete=index
        tampilkanawal()
    }
    const fundeedit=(index)=>{
        indexedit=index
        tampilkanawal()
    }
    const savedelete=(index)=>{
        document.getElementById('categoryInput').value=''
        document.getElementById('nameInput').value=''
        document.getElementById('priceInput').value=''
        document.getElementById('stockInput').value=''
        arrProduct.splice(index,1)
        indexdelete=-1
        tampilkanawal()

    }
    const canceldelete=()=>{
        indexdelete=-1
        tampilkanawal()
    }
    let saveEdit=(index)=>{
        var category=document.getElementById('editkategori'+indexedit).value
        var name=document.getElementById('editname'+indexedit).value
        var price=document.getElementById('editprice'+indexedit).value
        var stock=document.getElementById('editstock'+indexedit).value
        arrProduct.splice(index,1,{...arrProduct[indexedit],category,name,price,stock})
        indexedit=-1
        tampilkanawal()
    }
    const cancelEdit=()=>{
        indexedit=-1
        tampilkanawal()
    }

    const funInputData=()=>{
            var nama,harga,stok,kategori
            nama=document.getElementById('nameInput').value;
            harga=document.getElementById('priceInput').value;
            kategori=document.getElementById('categoryInput').value;
            stok=document.getElementById('stockInput').value;
            var time=new Date().getTime()
            
            var obj={id:time,name:nama,price:harga,category:kategori,stock:stok}
            arrProduct.push(obj)
            document.getElementById('nameInput').value=''
            document.getElementById('priceInput').value=''
            document.getElementById('categoryInput').value=''
            document.getElementById('stockInput').value=''
            tampilkanawal()
            
        }



let filter=()=>{
    var nameinput=document.getElementById('keyword').value //''
    var minprice=document.getElementById('min').value // ''
    var maxprice=document.getElementById('max').value // ''
    var category=document.getElementById('categoryFilter').value
    var newarr=arrProduct.filter((val)=>{
        var inputname=val.name.toLowerCase().includes(nameinput.toLowerCase())//boolean
        if(!nameinput){
            inputname=true //kalo inputnya kosong
        }
        var inputprice=val.price>=minprice&&val.price<=maxprice
        if(!minprice||!maxprice){
            inputprice=true // klo inputannya kosong
        }
        var inputcategory=val.category==category&&category!=='All'
        if(category=='All'){
            inputcategory=true //klo inputannta kosong
        }
        return inputname && inputprice && inputcategory //true 
    })
    document.getElementById('render').innerHTML=Showfilter(newarr).join('')
    }            
    function Showfilter(filterarr){
      return filterarr.map((val,index)=>{
             return(
                     `<tr>
                            <td>${val.id}</td>
                            <td>${val.category}</td>
                            <td>${val.name}</td>
                            <td>${val.price}</td>
                            <td>${val.stock}</td>
                            <td><button value='Add' id='tidak' onclick='funbuy(${val.id})'>Add</button>
                            <td><button value='Delete' onclick='fundelete()'>Delete</button>
                                <button value='Edit' onclick='fundeedit()'>Edit</button> </td>
                        </tr>`
                    )
                })
            }

    tampilkanawal()
