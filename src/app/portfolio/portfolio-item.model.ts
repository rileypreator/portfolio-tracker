export class PortfolioItem {
    public id: string;
    public name: string;
    public link: string;
    public description: string;
    public date: string;
    
    constructor(id: string, name: string, link: string, description: string, date: string) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.description = description;
        this.date = date;
    }
}