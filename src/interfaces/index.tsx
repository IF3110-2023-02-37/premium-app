export interface PodcastData {
  podcaster: string,
  audio: string, 
  title: string,
  picture: string,
}

export interface Podcast {
  id: string,
  podcaster: string,
  title: string,
  audio: string,
  picture: string,
  date: string
}

export interface FormLogin {
  username: string;
  password: string;
}

export interface FormRegister {
  displayName : string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AddPodcastModalProps {
  addNewPodcast: (newPodcast: Podcast) => void;
}

export interface DeletePodcastModalProps {
  deletePodcast: (podcast: Podcast) => void;
}