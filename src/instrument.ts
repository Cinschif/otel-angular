import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    WebTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor,
    BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
 
const provider = new WebTracerProvider();
 
// For demo purposes only, immediately log traces to the console
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
//nao tem configuraçao de performance, se o collector ta down, a aplicaçao para
 
// Batch traces before sending them to Otel Collector (under construction)
provider.addSpanProcessor(
  //como configurar para trabalhar com o collector
    new BatchSpanProcessor(
        new OTLPTraceExporter({
            url: 'http://localhost:4317',
           // headers: {
              //  'x-honeycomb-team': 'WuP2oXT5lYbqFnoGuUxfoD',
          //  },
        }),
    ),
);
 
provider.register({
  contextManager: new ZoneContextManager(),
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