# otel-angular
This project aims to implement **Opentelemetry** on an **Angular** application and correlate it with the information of one **.Net Microservice**.

# Configuration
|Tech| Version  |
|--|--|
| Node  | 16.20.0 |
| Angular  | 12.2.0 |


## How it Works

We have separated the project into branches :

-   **Propagator** : Contains the complete instrumentation from Angular front-end using a local .Net Microservice that you may find the code in [here](https://github.com/Cinschif/microservices-dotnet6). 
-   **order-otel-config** : Contains the complete instrumentation from Angular front-end using the Order Microservice from the Transformation Project. 

## How to Run it
After cloning the repository, you should choose the branch you may want to run and follow the steps below:

 1.  Run in the terminal `npm install` command to install the dependencies.
 3. Run the command `ng serve` to start the Angular Project.
 
 ## ⚠️ Telemetry 
Please, make sure to configure the OpenTelemetry Collector with the Front-End and Back-End information to have the report's correlation of both. For that, configure the `config.yaml` file in your Collector.
Having a New Relic account and configuring the file with YOUR-API-KEY is necessary to observe the trace.

If you need any help with the project, contact us.

@[**mcdschiff**](https://github.com/mcdschiff) @[**jnonato-mcd**](https://github.com/jnonato-mcd)
