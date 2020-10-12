export interface Plan {
  date: Date;
  array: {
    stunde: string;
    fach: string;
    lehrer: string;
    vert_lehrer: string;
    klasse: string;
    raum: string;
    text: string;
  }[];
}
