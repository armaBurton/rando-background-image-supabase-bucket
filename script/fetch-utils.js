const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyODkwOTc5LCJleHAiOjE5NTg0NjY5Nzl9.QjAMULUR5x8oGH0mteooznSxymCgpk9bhaWsOF3cZ1Y';


const SUPABASE_URL = 'https://nivykegwwwhynfclyita.supabase.co';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function uploadBackgroundImage(image) {
    console.log(`******************    uploading...please wait    ******************`);

    const response = await client
    .storage
    .from(`background-images`)
    .upload(`background-images/${image.name}`, image, {
        cacheControl: `3600`,
        upsert: false
    });

    return checkError(response)
}

export async function getImageURL(image){
    const response = await client
        .storage
        .from(`background-images`)
        .getPublicUrl(`${image.name}`);
        
        return checkError(response);
    }

export async function updateImageArr(arr){
    const response = await client
        .from(`background-image-table`)
        .update(arr)
        .match({ id: 1 });

    return checkError(response);
}

export async function uploadToTable(imgObj){
    const response = await client
        .from(`background-image-table`)
        .insert({ ...imgObj })

    return checkError(response);
}

export async function getImageArr(){
    const response = await client
        .from(`background-image-table`)
        .select();

    return checkError(response)
}

function checkError({ data, error }) {
    return error ? error : data;
}
