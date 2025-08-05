class ScenarioModel {
    public technology: string;
    public role: string;
    public environment: string;
    public scenario: string;

    constructor(tech: string, role: string, environment: string, scenario: string) {
        this.technology = tech;
        this.role = role;
        this.environment = environment;
        this.scenario = scenario;
    }

    public matches(tech: string, role: string, environment: string) {
        return (
            this.technology.toLowerCase() == tech &&
            this.role.toLowerCase() == role &&
            this.environment.toLowerCase() == environment
        );
    }
}

export default ScenarioModel;