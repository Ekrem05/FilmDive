using Newtonsoft.Json;

namespace FilmDive.Server.Infrastructure.Attributes
{
    public class OneDecimalPlaceConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException("This converter is only for reading.");
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.Value is null)
            {
                throw new JsonException("Expected a non-null value.");
            }

            if (decimal.TryParse(reader.Value.ToString(), out decimal result))
            {
                return Math.Round(result, 1);
            }

            throw new JsonException($"Unable to parse '{reader.Value}' as a decimal.");
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(decimal) || objectType == typeof(double);
        }
    }
}
