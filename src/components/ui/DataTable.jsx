/**
 * Tabela simples e reutilizável.
 * colunas: [{ chave, titulo, alinhar: 'left' | 'right', render?(linha) }]
 */
export default function DataTable({ colunas, dados, chaveLinha = (linha) => linha.id }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {colunas.map((c) => (
            <th key={c.chave} className={c.alinhar === 'right' ? 'text-right' : ''}>
              {c.titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.map((linha) => (
          <tr key={chaveLinha(linha)}>
            {colunas.map((c) => (
              <td key={c.chave} className={c.alinhar === 'right' ? 'num' : ''}>
                {c.render ? c.render(linha) : linha[c.chave]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
