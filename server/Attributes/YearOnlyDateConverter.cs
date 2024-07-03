using Newtonsoft.Json;

namespace FilmDive.Server.Attributes
{
    public class YearOnlyDateConverter : JsonConverter<int>
    {
        public override void WriteJson(JsonWriter writer, int value, JsonSerializer serializer)
        {
            throw new NotImplementedException("This converter is only for reading.");
        }

        public override int ReadJson(JsonReader reader, Type objectType, int existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var dateString = (string)reader.Value;
            if (DateTime.TryParse(dateString, out DateTime date))
            {
                return date.Year;
            }
            throw new JsonException($"Unable to parse '{dateString}' as a date.");
        }

    }
}
