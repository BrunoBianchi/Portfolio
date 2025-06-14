export async function getGithubLanguages() {
        const repos =  await fetch("https://api.github.com/users/BrunoBianchi/repos").then(res=>res.json())
        const languages = await Promise.all(repos.map(async (repo: { languages_url: string }) => {
            return await fetch(repo.languages_url).then(res => res.json())
        }));
        return languages.filter((lang: any) => {
            console.log(lang)

        } )
 
    
}