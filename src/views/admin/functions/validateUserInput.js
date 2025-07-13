export default function validateUserInput(item) {
    /* Initial User input */
    console.log('Before submission, item:', item)

    /* Validate item in Pinia */ 
    if (!item.title || item.title.length < 3 || !item.author || !item.dimensions || !item.materials || !item.file) {
        alert('Please complete the form correctly')
        return
    }  else {
        console.log(`Form is valid: `)
        console.log(`title: ${item.title}`)
        console.log(`author: ${item.author}`)
        console.log(`dimensions: ${item.dimensions.w}x${item.dimensions.h} ${item.dimensions.unit}`)
        console.log(`materials: ${JSON.stringify(item.materials.join(', '))}`)
        console.log(`file: ${item.file.name}`)  
        console.log('Saving image in Supabase Storage...')     
    }   
}