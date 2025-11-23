// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

let domain = "goatgirl.nekoweb.org";

(async () => {
  try {
    const request = await fetch(`https://nekoweb.org/api/site/info/${domain}`,);
    const json = await request.json();

    const updated = new Date(json.updated_at).toLocaleDateString(); 
    const created = new Date(json.created_at).toLocaleDateString(); 

    if (document.getElementById("stats-created")) document.getElementById("stats-created").innerHTML = `<b>created</b>: ${created}`;
    if (document.getElementById("stats-updated")) document.getElementById("stats-updated").innerHTML = `<b>updated</b>: ${updated}`;
    if (document.getElementById("stats-visitors")) document.getElementById("stats-visitors").innerHTML = `<b>visits</b>: ${json.views}`;
    if (document.getElementById("stats-followers")) document.getElementById("stats-followers").innerHTML = `<b>followers</b>: ${json.followers}`;
  } catch (error) {
    console.error(error);
  }
})();