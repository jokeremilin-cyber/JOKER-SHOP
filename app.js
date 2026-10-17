const WHATSAPP = "22890000000"; // <-- METS TON NUMERO ICI SANS +

const products = [
 {id:1,name:"Classic Ankara Tee",price:12000,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
 {id:2,name:"Urban Walk Sneakers",price:35000,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"},
 {id:3,name:"Relaxed Cargo Set",price:28000,img:"https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400"},
 {id:4,name:"Essential Black Tee",price:9500,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
 {id:5,name:"Lomé Street Hoodie",price:18000,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
 {id:6,name:"Wax Cargo Pants",price:22000,img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
 {id:7,name:"White Sneakers",price:30000,img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400"},
 {id:8,name:"Oversized Tee Cream",price:11000,img:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400"},
];

let cart=[];
const grid=document.getElementById('products');
grid.innerHTML=products.map(p=>`<div class="card"><img src="${p.img}"><h4>${p.name}</h4><p>${p.price.toLocaleString()} FCFA</p><button onclick="add(${p.id})">Ajouter</button></div>`).join('');

function add(id){
 const p=products.find(x=>x.id===id);
 const f=cart.find(x=>x.id===id);
 if(f) f.qty++; else cart.push({...p,qty:1});
 update();
}
function update(){
 document.getElementById('count').textContent=cart.reduce((a,b)=>a+b.qty,0);
 let total=0;
 document.getElementById('items').innerHTML=cart.map(c=>{total+=c.price*c.qty;return `<div style="display:flex;gap:10px;margin-bottom:12px"><img src="${c.img}" style="width:50px;height:50px;border-radius:8px"><div style="flex:1"><b>${c.name}</b><br><small>${c.price.toLocaleString()} x ${c.qty}</small></div><button onclick="rem(${c.id})">🗑️</button></div>`}).join('') || "Panier vide";
 document.getElementById('total').textContent=total.toLocaleString()+" FCFA";
}
window.rem=(id)=>{cart=cart.filter(c=>c.id!==id);update();}
document.getElementById('cartBtn').onclick=()=>document.getElementById('drawer').classList.remove('hidden');
document.getElementById('close').onclick=()=>document.getElementById('drawer').classList.add('hidden');
document.getElementById('order').onclick=()=>{
 let msg="Bonjour LOME STYLE, je veux commander:%0A";
 cart.forEach(c=>msg+=`- ${c.name} x${c.qty} = ${c.price*c.qty} FCFA%0A`);
 msg+=`%0ATotal: ${cart.reduce((a,b)=>a+b.price*b.qty,0)} FCFA`;
 window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,"_blank");
}
