// var currentPage = 1;

// function loadpage(page){
//     currentPage = page
// $.ajax({
//     url:"/listproduct?page=" + page,
//     type:"GET"
// })

// .then(data=>{
//     $("#content").html('')
//     for(let i = 0 ; i < data.length; i++){
//         var element = data[i];
//         var item = $(`
        
      
//         <h1> ${element.name} : ${element.giaban} </h1>
//         `)
//         $("#content").append(item)
//     }
// })
// .catch(err=>{
//     console.log("lỗi")
// })
// }
// function next(){
//     currentPage++
//     $.ajax({
//         url:"/listproduct?page=" + currentPage,
//         type:"GET"
//     })
    
//     .then(data=>{
//         $("#content").html('')
//         for(let i = 0 ; i < data.length; i++){
//             var element = data[i];
//             var item = $(`
            
          
//             <h1> ${element.name} : ${element.giaban} </h1>
//             `)
//             $("#content").append(item)
//         }
//     })
//     .catch(err=>{
//         console.log("lỗi")
//     })
// }

// function prev(){
//     currentPage--
//     $.ajax({
//         url:"/listproduct?page=" + currentPage,
//         type:"GET"
//     })
    
//     .then(data=>{
//         $("#content").html('')
//         for(let i = 0 ; i < data.length; i++){
//             var element = data[i];
//             var item = $(`
            
          
//             <h1> ${element.name} : ${element.giaban} </h1>
//             `)
//             $("#content").append(item)
//         }
//     })
//     .catch(err=>{
//         console.log("lỗi")
//     })
// }
