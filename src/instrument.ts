//Trace Imports
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

//Log Imports
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import {
  LoggerProvider,
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor,
} from '@opentelemetry/sdk-logs';

//Trace Configuration
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
 
// Batch traces before sending them to Otel Collector (under construction)
provider.addSpanProcessor(
     new BatchSpanProcessor(
        new OTLPTraceExporter({
            url: 'http://localhost:4318/v1/traces',
           
        }) ,
               
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

//Log Configuration

// to start a logger, first initialize the logger provoder
const loggerProvider = new LoggerProvider();
logs.setGlobalLoggerProvider(loggerProvider);

/* returns loggerProvider (no-op if a working provider has not been initialized) */
logs.getLoggerProvider();

//Add a processor to export log record
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
);

//  To create a log record, you first need to get a Logger instance
const logger = logs.getLogger('default');

// emit a log record
logger.emit({
  severityNumber: SeverityNumber.INFO,
  severityText: 'INFO',
  body: 'this is a log record body',
  attributes: { 'log.type': 'custom' },
});