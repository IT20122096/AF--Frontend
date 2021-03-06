import service from "../IT20122096/httpServices";

const url ="/topics";

export async function topics() {
  return await service.get(url + "/topics");
}

export async function getTopic(id) {
  return await service.get(url + `/topic/${id}`);
}

export async function updateTopic(id, data) {
  return await service.put(url + `/topic/update/${id}`, data);
}

export async function researchgroups(uId) {
  return await service.get(url + `/researchgroups/${uId}`);
}

export async function getResearchGroup(id) {
  return await service.get(url + `/researchgroup/${id}`);
}

export async function criteriass() {
  return await service.get(url + `/criterias`);
}

export async function saveCriterias(data) {
  return await service.post(url + `/criterias/save`, data);
}

export async function marks() {
  return await service.get(url + "/marks");
}
