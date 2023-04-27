//Log Imports
//import { diag } from '@opentelemetry/core';
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
//import {
 // LoggerProvider,
 // } from '@opentelemetry/sdk-logs';
//import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { LogLevel, diag } from '@opentelemetry/core';
import { CollectorExporterNode } from '@opentelemetry/exporter-collector';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/tracing';

//Logs

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "Otel-Angular",
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
         })
  );

//const collectorOptions={
  // url: 'http://localhost:4318/v1/logs',
   // resource:resource
    //};

// to start a logger, first initialize the logger provider
const collectorExporter = new CollectorExporterNode({
resource: resource,
url: 'http://localhost:55680/v1/logs',
});

// Create a new ConsoleSpanExporter instance for debugging purposes
const consoleExporter = new ConsoleSpanExporter();

// Create a new SimpleSpanProcessor instance and add the exporters
const spanProcessor = new SimpleSpanProcessor(collectorExporter);
spanProcessor.addSpanExporter(consoleExporter);

// Set the log level to debug
diag.setLogger({
debug: (message) => console.debug(message),
info: (message) => console.info(message),
warn: (message) => console.warn(message),
error: (message) => console.error(message),
});

// Set the global log level to debug
diag.setLogLevel(LogLevel.DEBUG);

// Register the span processor
diag.registerLogger(spanProcessor);

// Now you can use the console object to log messages
console.log('Hello, world!');
console.warn('This is a warning!');
console.error('This is an error!');

//////////////////////////////////////////////////////////////////

//const loggerProvider = new LoggerProvider();
//logs.setGlobalLoggerProvider(loggerProvider);

/* returns loggerProvider (no-op if a working provider has not been initialized) */
//logs.getLoggerProvider();

//Add a processor to export log record
//loggerProvider.addLogRecordProcessor(
 //new BatchLogRecordProcessor (loggerExporter));
 
//  To create a log record, you first need to get a Logger instance
//onst logger = logs.getLogger('example');

// emit a log record
//logger.emit({
 //severityNumber: SeverityNumber.INFO,
  //severityText: 'INFO',
  //body: 'this is a log record body',
  //attributes: { 'log.type': 'custom' },
//});
    
  