$(document).ready(function(){
    const Url= "https://api.discountapi.com/v2/deals?api_key=aumtHLbj";
    $('.btn').click(function(){
        $.ajax({
            url: Url,
            type: "GET",
            success:function(result){
                console.log(result)
            },
            error:function(error){
                console.log(this+'Error')
            }
            

        
        })
    })
});