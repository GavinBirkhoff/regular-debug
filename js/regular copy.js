const re =[
    {id:"re1",code:/^[0-9\-]{1,18}$/,des:`可输入数字和“-”，最多输入19个字符，不可为空`},
    {id:"re2",code:/^(?:0\.(?:0[1-9]|[1-9]\d)|[1-9]\d?\.\d\d)$/,des:`输入值必须是介于 0.01 与 99.99 之间的数字。不可为空`},
    {id:"re3",code:/^(?!0{1,2}\.0(?![1-9]))\d{1,2}(?:\.\d{1,2})?$/,des:`输入值必须是介于 0.01 与 99.99 之间的数字。不可为空`},
]
const IText = $("IText")
const InputApp = $("inputApp")
const Log = $("log")
IText.addEventListener("input",(e)=>{
    let radioValue = getRadioButtonCheckedValue("re")
    let regular = ''
    re.forEach(item=>{
        if(item.id==radioValue){
            regular = item.code
        }
    })
    if(Object.prototype.toString.call(regular)!== `[object RegExp]`){
        Log.innerHTML = `你还没有选择表达式,请选择下列正则表达式`
        return false
    }
    let result = test(regular,IText.value)
    console.log(`value: ${IText.value}, type: ${typeof IText.value}, 匹配结果为: ${result}`)
    Log.innerHTML = `value: ${IText.value}, type: ${typeof IText.value}, 匹配结果为: ${result}`
})

function initInputApp(sr){
    const ul = document.createElement("ul");
    sr.forEach(element => {
       let li=  document.createElement("li")
       createInput(element.id,"re","radio",element.id,li)
       createLabel(element.id, element.des,li)
       ul.appendChild(li)
    })
    InputApp.appendChild(ul)
}

function test(re,value){
    return re.test(value)
}

function $(id){
    return document.getElementById(id)
}

function createInput(id,inputName, inputType, inputValue, aDiv) {
    let input = document.createElement("input");
    input.setAttribute("id",id);
    input.setAttribute("type",inputType);
    input.setAttribute("name",inputName);
    input.setAttribute("value", inputValue);
    aDiv.appendChild(input) 
}

function createLabel(id, text, aDiv){
    let label = document.createElement("label");
    label.setAttribute("for", id)
    label.appendChild(document.createTextNode(text))
    aDiv.appendChild(label)
}

function createText(text,aDiv){
    let textNode = document.createTextNode(text);
    aDiv.appendChild(textNode);
}

/**
 * 获取input = radio 单选框中选中的值
 * @param tagNameAttr string  radio组中input的name属性值
 * return 返回被选中radio的值
 */
function getRadioButtonCheckedValue(tagNameAttr){
    var radio_tag = document.getElementsByName(tagNameAttr);
    for(var i=0;i<radio_tag.length;i++){
        if(radio_tag[i].checked){
            var checkvalue = radio_tag[i].value;            
            return checkvalue;
        }
    }
}

initInputApp(re)