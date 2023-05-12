import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    WebTracerProvider,
    BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "Otel-Angular",
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
         })
  );

const provider = new WebTracerProvider({
    resource: resource,
});
 
// Batch traces before sending them to Otel Collector 
provider.addSpanProcessor(
     new BatchSpanProcessor(
        new OTLPTraceExporter({
            url: 'http://localhost:4318/v1/traces',
           
        }) ,       
    ),
);
 
provider.register({
  contextManager: new ZoneContextManager()
 
});  

registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {},
            '@opentelemetry/instrumentation-xml-http-request': {},
        }),
    ],
});

registerInstrumentations({
    instrumentations: 
          getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {},
            '@opentelemetry/instrumentation-xml-http-request': {},
        
        }),
          
});
